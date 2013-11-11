require 'csv'
require 'json'

# Columns:
# t, step, pixel_x, pixel_y

id = 1
coords = []

Dir.glob(File.join('src/', '*')).each do |file|
  CSV.foreach(file, :col_sep => "\t") do |row|
    next unless $. > 2

    coords << {
      :id    => id,
      :frame => row[1].gsub(/,/, '').to_i,
      :x     => row[2].gsub(/,/, '').to_f,
      :y     => row[3].gsub(/,/, '').to_f,
      :type  => file.match(/person/) ? 'person' : 'vehicle'
    }
  end

  id += 1
end

File.open('coords.json', 'w') do |f|
  f.write(coords.to_json)
end
