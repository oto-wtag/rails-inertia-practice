# frozen_string_literal: true

class AddPictureDescriptionAndCreatedByToCountries < ActiveRecord::Migration[8.0]
  def change
    add_column :countries, :description, :text
    add_column :countries, :picture, :string
    add_reference :countries, :created_by, null: true, foreign_key: {to_table: :users}
  end
end
