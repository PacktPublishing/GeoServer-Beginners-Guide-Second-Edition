import urllib2, json

if __name__ == '__main__':
    url = 'http://localhost:8080/geoserver/Packt/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Packt:places&outputFormat=application%2Fjson'
    uh = urllib2.urlopen(url)
    datastring = uh.read()
    data = json.loads(datastring)
    for feature in data['features']:
        print('{0} -- {1}').format(feature['properties']['name'],feature['geometry']['coordinates'])