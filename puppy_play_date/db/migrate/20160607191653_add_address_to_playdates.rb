class AddAddressToPlaydates < ActiveRecord::Migration
  def change
    add_column :playdates, :address, :string
  end
end
