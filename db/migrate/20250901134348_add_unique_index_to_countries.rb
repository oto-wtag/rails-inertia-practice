# frozen_string_literal: true

class AddUniqueIndexToCountries < ActiveRecord::Migration[8.0]
  def change
    add_index :countries, :code, unique: true
    add_index :countries, :name, unique: true
  end
end
