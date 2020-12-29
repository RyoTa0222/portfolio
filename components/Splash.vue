<template>
    <div class="splash-container">
        <picture>
            <!-- WebP用画像 -->
            <source srcset="@/assets/images/splash-pc.webp" type="image/webp">
            <!-- 従来画像 -->
            <img src="@/assets/images/splash-pc.png">
        </picture>
        <div>
            <p class="typewriter">RyoTa.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.splash-container {
    @apply w-screen flex justify-center items-center fixed left-0 bg-white dark:bg-dark flex-col;
    height: 200vh;
    top: -50vh;
    picture {
        width: 200px;
    }
}
.typewriter {
    @apply text-black dark:text-white overflow-hidden whitespace-nowrap my-0 mx-auto mt-2 border-blue-300 border-r-2 border-solid;
    letter-spacing: .15em; /* Adjust as needed */
    animation: 
    typing 3.5s steps(20, end),
    blink-caret .75s step-end infinite;
    animation-delay: 0.5s;
}
</style>

<style>
/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 65px }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #93C5FD; }
}
</style>
