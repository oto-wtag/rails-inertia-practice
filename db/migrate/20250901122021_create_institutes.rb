# frozen_string_literal: true

class CreateInstitutes < ActiveRecord::Migration[8.0]
  def change
    create_table :institutes do |t|
      t.string :name
      t.string :city
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end
  end
end
