Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :users, only: [] do
    collection do
      post :login
      get :me
    end
  end

  root to: 'pages#index'

  # Pass any path to react
  get '/*path' => 'pages#index'
end
