# frozen_string_literal: true

class Institute < ApplicationRecord
  belongs_to :country

  has_many :courses, dependent: :destroy

  validates :name, presence: true
end
