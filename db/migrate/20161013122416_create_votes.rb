class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :user_id
      t.references :votable, polymorphic: true, index: true
      t.boolean :up_down

      t.timestamp
    end

  end
end
