---
title: Voice Chat (Vivox)
parent: For Users
---

# Voice Chat (Vivox)

V Rising supports proximity voice chat on dedicated servers via Vivox, Unity's voice and text chat service. Players hear each other based on in-game distance; audio fades as players move apart. Voice chat is **not** enabled by default and requires the server operator to set up a free Unity Gaming Services account and create a `ServerVoipSettings.json` file.

## 1. Create a Unity Gaming Services account

Go to [dashboard.unity.com](https://dashboard.unity.com) and create a free account if you do not have one already.

## 2. Create a project

From the dashboard, go to **Projects** (second item in the left sidebar) and create a new project. The name does not matter.

## 3. Set up Vivox

1. Open your project and go to the **Services** tab.
2. Scroll down to **Vivox Voice and Text Chat** and click **Launch**. This opens the Setup Guide.
3. Select **Unity** as the engine. **Voice and Text Chat** is already selected as a required service. Click **Next**.
4. Skip the **Link Unity project** step by clicking **Next** again.
5. Click through to finish.

## 4. Get your credentials

In the left sidebar under **Voice and Text Chat**, click **Credentials**. You will need four values:

| Dashboard label | JSON field |
|---|---|
| Token issuer | `VOIPIssuer` |
| Token key | `VOIPSecret` |
| Domain | `VOIPVivoxDomain` |
| Server | `VOIPAPIEndpoint` |

## 5. Create ServerVoipSettings.json

Create a file named `ServerVoipSettings.json` with the following content, substituting your own credentials:

```json
{
  "VOIPEnabled": true,
  "VOIPIssuer": "your-token-issuer",
  "VOIPSecret": "your-token-key",
  "VOIPVivoxDomain": "your-domain",
  "VOIPAPIEndpoint": "https://unity.vivox.com/appconfig/your-token-issuer",
  "VOIPAppUserId": "notneeded-notused",
  "VOIPAppUserPwd": "notneeded-notused",
  "VOIPConversationalDistance": 14,
  "VOIPAudibleDistance": 40,
  "VOIPFadeIntensity": 2.0
}
```

- `VOIPAPIEndpoint` maps to the **Server** field on the Credentials page.
- Leave `VOIPAppUserId` and `VOIPAppUserPwd` as `"notneeded-notused"`.
- The distance and fade values are optional to adjust; the defaults above work well for most servers.

## 6. Place the file and restart

Put `ServerVoipSettings.json` in your server's `save-data\Settings\` folder (or your configured `persistentDataPath` if you have changed it). Restart the server.

## 7. Enable voice chat in-game

Players must also enable voice chat in their in-game settings under **Use Voice Chat** for it to work on their end.
