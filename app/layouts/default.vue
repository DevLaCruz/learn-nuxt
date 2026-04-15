<template>
    <div>
       <div class="flex flex-col h-screen"> 
        <!-- <MainNavigation/> -->

        <SharedHeader/>
        <!--Header-->

        <main class="container mx-auto flex-1 mt-2">
            <slot/>
        </main>

        <SharedFooter/>
        <!--Footer-->
       </div>
    </div>
</template>