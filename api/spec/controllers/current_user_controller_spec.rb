require 'rails_helper'

RSpec.describe CurrentUserController, type: :controller do
  describe "GET #index" do
    context "when user is logged in" do
      before do
        @user = User.create!(email: "test@example.com", password: "password")
        sign_in @user
        get :index
      end

      it "returns http success" do
        # retorna 200 se autenticado
        expect(response).to have_http_status(:success)
      end

      it "returns the current user" do
        # retorna email do user em questao
        json_response = JSON.parse(response.body)
        expect(json_response["email"]).to eq(@user.email)

      end
    end

    context "when user is not logged in" do
      before do
        get :index
      end

      it "returns http unauthorized" do
        # retorna 401 se nao autenticado
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        # retorna mensagem de erro
        response.body = "You need to sign in or sign up before continuing."
      end
    end
  end
end