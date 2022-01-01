<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

body::-webkit-scrollbar
{
  width: 5px;
}

body::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: #F90;
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent)
}
</style>
