class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.references :dog, index: true, foreign_key: true
      t.references :playdate, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
