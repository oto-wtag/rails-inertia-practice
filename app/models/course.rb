# frozen_string_literal: true

class Course < ApplicationRecord
  belongs_to :institute

  belongs_to :university

  validates :name, presence: true
end
