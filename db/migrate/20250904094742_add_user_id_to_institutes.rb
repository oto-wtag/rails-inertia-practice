# frozen_string_literal: true

class AddUserIdToInstitutes < ActiveRecord::Migration[8.0]
  def change
    add_reference :institutes, :user, null: false, foreign_key: true
  end
end
