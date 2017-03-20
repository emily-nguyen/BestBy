from bs4 import BeautifulSoup

import json
import urllib2 
import web

'''
Python 2.7 Implementation 

Local server that retrieves grocery store sales by scraping the weekly ad

To run in command line:
python web_server.py

Endpoint url: http://localhost:8080/sales
'''

GROCERY_AD = 'http://www.wholefoodsmarket.com/sales-flyer/irvine'

urls = (
	'/sales', 'GetSales'
)

class GetSales:
	def GET(self):
		web.header('Access-Control-Allow-Origin', '*')
		
		# key: 'products', value: [{'name': name, 'price': price}]
		sales = {}
		sales['products'] = []

		try:
			response = urllib2.urlopen(GROCERY_AD)
			soup = BeautifulSoup(response, 'lxml')

			products = soup.find_all('div', class_='views-row views-row-odd')

			for p in products:
				name = p.find('div', class_='views-field views-field-field-flyer-product-name').get_text()
				price_span = p.find('span', class_='my_price')

				# Only keep products that have a price
				if price_span:
					price = price_span.get_text()

					item = {'name': name, 'price': price}
					sales['products'].append(item)

		except Exception as e:
			print(e)

		return json.dumps(sales)

if __name__ == '__main__':
	app = web.application(urls, globals())
	app.run()