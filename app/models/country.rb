# frozen_string_literal: true

class Country < ApplicationRecord
  belongs_to :created_by, class_name: "User"
  has_many :institutes, dependent: :destroy

  has_one_attached :picture
  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :code, presence: true, uniqueness: {case_sensitive: false}

  validate :picture_format, if: -> { picture.attached? }

  def self.ransackable_attributes(auth_object = nil)
    %w[name code description institutes_count]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[created_by]
  end

  private

  def picture_format
    return unless picture.attached?

    unless picture.content_type.in?(%w[image/jpeg image/png image/gif])
      errors.add(:picture, "must be a JPEG, PNG, or GIF image")
    end
  end
end
