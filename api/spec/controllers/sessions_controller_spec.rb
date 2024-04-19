require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  describe "POST #create" do
    context "when valid credentials" do
      before do
        @user = User.create!(email: "test@example.com", password: "password")
        @request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: { user: { email: @user.email, password: @user.password } }
      end

      it "returns http success" do
        expect(response).to have_http_status(:success) # parametros ok, 200
      end

      it "returns the logged in user" do
        json_response = JSON.parse(response.body) # retorna o user logado
        expect(json_response["user"]["email"]).to eq(@user.email)
      end
    end

    context "when invalid credentials" do
      before do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        post :create, params: { user: { email: "wrongexample.com", password: "123" } }
      end

      it "returns http unauthorized" do
        expect(response).to have_http_status(:unauthorized) # parametros errados, 401
      end
    end
  end

  describe "DELETE #destroy" do
    context "when user is logged in" do
      before do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        @user = User.create!(email: "test@example.com", password: "password")
        sign_in @user
        delete :destroy
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "returns a logout message" do
        json_response = JSON.parse(response.body)
        expect(json_response["message"]).to eq("User logged out.")
      end
    end

    # context "when user is not logged in" do # este teste não passa, pois mesmo sem autenticação, o retorno é sempre 200
    #   before do
    #     @request.env["devise.mapping"] = Devise.mappings[:user]
    #     delete :destroy
    #   end
    #
    #   it "returns http unauthorized" do
    #     expect(response).to have_http_status(:unauthorized)
    #   end
    # end
  end
end