# frozen_string_literal: true

class RemovePictureFromInstitutes < ActiveRecord::Migration[8.0]
  def change
    remove_column :institutes, :picture, :string
  end
end
