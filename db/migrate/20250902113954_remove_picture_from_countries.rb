# frozen_string_literal: true

class RemovePictureFromCountries < ActiveRecord::Migration[8.0]
  def change
    remove_column :countries, :picture, :string
  end
end
