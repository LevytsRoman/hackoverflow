post '/answers/:answer_id/votes' do

  #if a user is logged in(only logged in users can vote)
  if current_user
    #find question
    question = Question.find_by(id: params[:question_id])
    #decide if vote is up or down
    params[:up_down] == 'up' ? user_vote = true : user_vote = false
    #question.voted? is a method that determines if a user has voted on particular question
    if voted(current_user_id, question)
      # if a vote exists, find in
      vote = Vote.where(votable_type: "Question", votable_id: question.id, user_id: current_user_id)[0]
      # update attribute with the newest vote
      vote.update_attribute(:up_down, user_vote)
    else
      #otherwise create a new vote
      new_vote = Vote.create(user_id: current_user_id, votable: question, up_down: user_vote)
    end
  end

  content_type :json
  {vote_num: vote_num(question), question_id: question.id, vote_class: voted(current_user_id, question)}.to_json
end
