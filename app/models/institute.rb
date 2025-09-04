# frozen_string_literal: true

class Institute < ApplicationRecord
  belongs_to :country, counter_cache: true
  belongs_to :created_by, class_name: "User", foreign_key: :created_by_id

  has_many :courses, dependent: :destroy
  has_one_attached :picture

  validates :name, presence: true, uniqueness: {case_sensitive: false}

  validate :picture_format, if: -> { picture.attached? }

  def self.ransackable_attributes(auth_object = nil)
    %w[name city country_id]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[country]
  end

  private

  def picture_format
    return unless picture.attached?

    unless picture.content_type.in?(%w[image/jpeg image/png image/gif])
      errors.add(:picture, "must be a JPEG, PNG, or GIF image")
    end
  end
end
