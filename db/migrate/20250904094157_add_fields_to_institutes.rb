# frozen_string_literal: true

class AddFieldsToInstitutes < ActiveRecord::Migration[8.0]
  def change
    add_column :institutes, :description, :text
    add_column :institutes, :picture, :string
  end
end
