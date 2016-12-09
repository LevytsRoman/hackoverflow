require 'bcrypt'

class User < ActiveRecord::Base
  has_many :votes
  has_many :questions
  has_many :answers
  has_many :comments

  has_secure_password

  validates :email, :password_digest, :username, presence: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create, uniqueness: true

  def reputation
    q = 0
    a = 0
    q = self.questions.reduce(0) {|sum, item| sum + item.votes.length} if self.questions
    a = self.answers.reduce(0) {|sum, item| sum + item.votes.length} if self.answers
    a + q
  end
end
