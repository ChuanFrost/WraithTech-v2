var url = 'http://localhost:8000';
var apiUrl = url + '/api';


var path =
{
    'product':
    {
        'index': '/product',
        'type': '/product/type',
        'brand': '/product/brand',
        'search': '/product/search',
        'searchParams': '/product/searchParams'
    }
}

for (var key in path)
{
    var obj = path[key]
    for (var key2 in obj)
    {
        path[key][key2] = apiUrl + path[key][key2]
    }
}

export {url, path};
