class CreatePlaydates < ActiveRecord::Migration
  def change
    create_table :playdates do |t|
      t.string :name
      t.text :description
      t.string :location
      t.string :frequency
      t.string :time_day
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
