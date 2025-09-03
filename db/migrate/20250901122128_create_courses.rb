# frozen_string_literal: true

class CreateCourses < ActiveRecord::Migration[8.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :level
      t.text :description
      t.decimal :tuition_fee
      t.references :institute, null: false, foreign_key: true

      t.timestamps
    end
  end
end
