require 'csv'
require 'json'

# Headers:
# t, step, pixel_x, pixel_y

id = 1

CSV.open('coords.csv', 'wb') do |csv|
  csv << ['id', 'frame', 'x', 'y', 'type']

  Dir.glob(File.join('src/', '*')).each do |file|
    CSV.foreach(file, :col_sep => "\t") do |row|
      next unless $. > 2

      row[0] = id
      row[1] = row[1].gsub(/,/, '').to_i
      row[2] = row[2].gsub(/,/, '').to_f
      row[3] = row[3].gsub(/,/, '').to_f

      if file.match(/person/)
        row[4] = 'person'
      else
        row[4] = 'vehicle'
      end

      csv << row
    end

    id += 1
  end
end
