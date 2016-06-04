class CreateDogs < ActiveRecord::Migration
  def change
    create_table :dogs do |t|
      t.string :name
      t.string :breed
      t.integer :age
      t.string :toy
      t.text :description
      t.string :gender
      t.references :owner, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
