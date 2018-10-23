require 'sinatra'
require 'json'
require 'sinatra/cross_origin'
require 'rack/cors'

use Rack::Cors do |config|
    config.allow do |allow|
    allow.origins '*'
    allow.resource '/fruits', :headers => :any
    allow.resource '/fruits/:fruit_id',
        :methods => [:get, :post, :put, :delete],
        :headers => :any,
        :max_age => 0
    allow.resource '/compound/*',
        :methods => [:get, :post],
        :headers => :any,
        :max_age => 0
    end
end

register Sinatra::CrossOrigin
configure do
    enable :cross_origin
end

before do
    content_type :json
end

fruits = [
    { 'id'=> 0, 'nombre' => 'Manzana', 'imagen'=> "./imagenes/1.jpg" },
    { 'id'=> 1, 'nombre'=> 'Moras', 'imagen'=> "./imagenes/2.jpg" },
    { 'id'=> 2, 'nombre'=> 'Bananos', 'imagen'=> "./imagenes/3.jpg" },
    { 'id'=> 3, 'nombre'=> 'Kiwi', 'imagen'=> "./imagenes/4.jpg" },
    { 'id'=> 4, 'nombre'=> 'Mango', 'imagen'=> "./imagenes/5.jpg" },
    { 'id'=> 5, 'nombre'=> 'Piña', 'imagen'=> "./imagenes/6.jpg" },
]

get'/'do
    return 'Hello World from sinatra'
end

#Get all
get '/fruits' do 
    return ('{"fruits": '+fruits.to_json+'}')
end

#Get one
get '/fruits/:fruit_id' do
    id = params[:fruit_id]
    i=0
    until i==fruits.length do
        if fruits[i]['id'] == id.to_i
            return fruits[i].to_json
        end           
        i += 1
    end
    return ('{"fruits": '+fruits.to_json+'}')
end

#Post 
post '/fruits' do  
    id = 0
    for fruit in fruits do
        if fruit['id'] > id 
            id = fruit['id']
        end           
    end 
    myJson = JSON.parse(request.body.read)
    myJson['id'] = id+1
    fruits.push(myJson)
    return ('{"fruits": '+fruits.to_json+'}')
end

#Put
put '/fruits/:fruit_id' do
    id = params[:fruit_id]
    myJson = JSON.parse(request.body.read)
    i=0
    until i==fruits.length do
        if fruits[i]['id'] == id.to_i
            fruits[i] = myJson
        end           
        i += 1
    end    
    return ('{"fruits": '+fruits.to_json+'}')
end

#Delete
delete '/fruits/:fruit_id' do
    id = params[:fruit_id]
    for fruit in fruits do
        puts fruit.to_s
        if fruit['id']== id.to_i
            fruits.delete(fruit)
        end
    end
    return ('{"fruits": '+fruits.to_json+'}')
end

#set :port, 5005

