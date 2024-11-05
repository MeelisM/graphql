// src/services/api.js
const BASE_URL = "https://01.kood.tech/api";
const GRAPHQL_URL = `${BASE_URL}/graphql-engine/v1/graphql`;

class ApiService {
  static getAuthHeader() {
    const token = localStorage.getItem("jwt");
    return token ? `Bearer ${token}` : "";
  }

  static async makeGraphQLRequest(query) {
    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        throw new Error(data.errors[0].message);
      }
      return data.data;
    } catch (error) {
      console.error("GraphQL request failed:", error);
      throw error;
    }
  }
  // argument based query (userId gets passed dynamically from localStorage)
  static async getUserProfile() {
    const userId = localStorage.getItem("userId");
    const query = `{
      user(where: { id: { _eq: ${userId} } }) {
        id
        login
        attrs
      }
    }`;
    const data = await this.makeGraphQLRequest(query);
    return data;
  }
  // normal query
  static async getAuditRatio() {
    const query = `{
      transaction(where: { type: { _in: ["up", "down"] } }) {
        type
      }
    }`;
    const data = await this.makeGraphQLRequest(query);
    return data;
  }

  static async getProjectStats() {
    const query = `{
      progress(
        where: {
          _and: [
            { grade: { _is_null: false } },
            { grade: { _gte: 1.2 } },
            { path: { _nregex: "piscine|onboarding" } }
          ]
        }
        order_by: { grade: desc }
      ) {
        grade
        path
        __typename
      }
    }`;

    try {
      const data = await this.makeGraphQLRequest(query);
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  // nested query
  static async getXPProgression() {
    const query = `{
      transaction(where: { type: { _eq: "xp" } }) {
        createdAt
        amount
        path
      }
    }`;
    const data = await this.makeGraphQLRequest(query);
    return data;
  }
}

export default ApiService;
