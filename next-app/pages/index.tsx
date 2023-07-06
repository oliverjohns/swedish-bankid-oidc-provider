import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <h1>Example Client App in Nextjs for BankID login</h1>
      <p>
        This is an example Next app that connects to the NestJs BankID OIDC
        provider via next-auth and gets a session from it.
      </p>
      <p>
        Press sign in above to sign in with BankID. You will be redirected to the Nestjs OIDC BankID identity provider and upon authenticating with BankID you will get a valid session in next auth.
      </p>
      <p>
        This is just an example app. Instead of this you would use your own frontend app (React, Vue, etc) and auth solution (Keycloak, Auth0, Aws cognito, etc).
      </p>
    </Layout>
  );
}
