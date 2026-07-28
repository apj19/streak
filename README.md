# Streak

1. Nextjs- simple for deployemnt of fontend and backend
2. shandcn- so ui will be clean
3. auth - used clerk for authentication--simple setup
4. db-postgres- saved useer data in posgress
   use schma will have cleark id is pk and by default it will genrate unique id for sharing for each users
5. for Blog used TipTap Editor which provide more control over editor styles
6. Saved edtor data as json string as db text which will allow more leangth and can be rendereded back on later
7. Main Issue- Streak calaulation -Intial though was to calcute streak when user called which will fire db query, which will work, but it giving more stress to db,
   then found out about

#### Write-Time Aggregation

insted of calculating streak logic on read operation we calculate it on write operation and save it to diffent table, so read will be fast.
