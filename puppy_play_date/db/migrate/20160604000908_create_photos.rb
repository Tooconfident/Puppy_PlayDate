class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :dog, index: true, foreign_key: true
      t.string :url

      t.timestamps null: false
    end
  end
end
