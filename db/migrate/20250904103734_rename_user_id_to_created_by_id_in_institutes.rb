# frozen_string_literal: true

class RenameUserIdToCreatedByIdInInstitutes < ActiveRecord::Migration[8.0]
  def change
    rename_column :institutes, :user_id, :created_by_id
    change_column_null :institutes, :created_by_id, false

    # Only add index if it doesn't exist
    unless index_exists?(:institutes, :created_by_id)
      add_index :institutes, :created_by_id
    end
  end
end
