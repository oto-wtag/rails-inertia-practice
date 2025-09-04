# frozen_string_literal: true

class AddInstitutesCountToCountries < ActiveRecord::Migration[8.0]
  def change
    add_column :countries, :institutes_count, :integer, default: 0, null: false
  end
end
