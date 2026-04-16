<template>
<UDashboardGroup
storage="local"
storage-key="dashborad-sidebar"
:permission="true"
>

<DashboardSidebar/>
<UDashboardPanel>
    <DashboardNavbar/>

<div class="flex-1 overflow-auto p-6"></div>

</UDashboardPanel>
</UDashboardGroup>
</template>