# Spotify Integration

Spotify integration is provided via the [spotify](https://docs.qilletni.dev/library/spotify/) package, which is a [Service Provider](/language/service_providers). Because it is a standalone package, it must be connected to Spotify.

## API Setup

Because using Qilletni is essentially using an API and not an end application, you must create Spotify API keys for your account.

To create an API, sign into [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and click `Create app` and fill in the `App name` and `App description`. Set the `Redirect URIs` field to `http://localhost:8088/spotify` and create the app.

Copy the Client ID from the **Basic Information** tab, and run the following `qilletni` command in your console:

```bash
qilletni persist spotify redirectUri=http://localhost:8088/spotify clientId=client-id
```

Where `client-id` is your Client ID, such as `c92e7a91a4d1402bca2e26a9e25e2be6`.

## Database Setup

The Spotify package also needs database access for caching music data. If using the default Docker Postgres settings from [Getting Started](/quickstart/getting_started), the following settings are populated by default and do not need manual setting:

```
| Property     | Value                                              |
| ------------ | -------------------------------------------------- |
| dbUsername   | qilletni                                           |
| dbUrl        | jdbc:postgresql://localhost:5435/qilletni_spotify  |
| dbPassword   | pass                                               |
```

To set these manually, the following may be ran:

```bash
qilletni persist spotify dbUsername=.. dbUrl=.. dbPassword=..
```

## Using The Package

The following is a quick example of a Qilletni program. Follow the [Getting Started](/quickstart/getting_started) guide to create a project, and add the following dependency in your `qilletni_info.yml` file:

```yml title="qilletni_info.yml"
dependencies:
  - spotify:^1.0.0
```

And make a basic program, which adds a song to your Spotify account's queue:

```qilletni title="qilletni_demo.ql"
play "Fireflies" by "Owl City"
```

For more usage of the Spotify package, see the [Spotify Package Page](/packages/spotify).

