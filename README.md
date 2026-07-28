# Streak

[Demo Link](https://streak-ecru-chi.vercel.app/)

For this MVP, I built a writing platform using Next.js, PostgreSQL, and the TipTap editor. A core engagement feature was a 'Streak' system to track user consistency. I needed to determine the most efficient way to calculate and display this streak every time a user viewed their profile.

---

1. **Nextjs:** Simple for deployment of frontend and backend.
2. **Shandcn:** UI will be clean. and will get time to focus on functionality.
3. **Auth:** Used clerk for authentication-simple setup.
4. **Postgres:** Saved user data in posgress
   - User schema will have clerk id as pk and by default it will generate unique id for sharing for each users.
   - Blog Table will save blog with user id as FK
   - userStates To save strek stats.
5. **TipTap Editor:** Used for blog editing which provide more control over editor styles. Added limited markdown support for the user to format their blogs.
6. **DB Storage:** Saved editor data as json string as db text which will allow more leangth and can be rendered back on later.
7. **Main Issue- Streak calaulation:** This the critical part of the app :Initial thought was to calcute streak when user called which will fire db query, which will work for mvp, but it is not effective way to handle
   so used **Write-Time Aggregation** concept where instead of calculating streak logic on read operation we calculate it on write operation and save it to different table, so read will be fast.

---

Missing Part :

1. Due to time limit i have not added test cases.
2. error handling is not proper.
