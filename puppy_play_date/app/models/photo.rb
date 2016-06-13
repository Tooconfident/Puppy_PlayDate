class Photo < ActiveRecord::Base
  belongs_to :dog

  validates :url, format: { with: URI.regexp }, if: Proc.new { |a| a.url.present? }
end
