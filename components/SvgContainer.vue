<template>
    <!-- twitter -->
    <svg v-if="name === 'twitter'" class="fill-current text-gray-600" id="グループ_5" data-name="グループ 5" xmlns="http://www.w3.org/2000/svg" width="48" height="40" viewBox="0 0 48 40">
        <g id="グループ_3" data-name="グループ 3" transform="translate(-300 -164)">
            <path id="パス_4" data-name="パス 4" d="M348,168.735a19.235,19.235,0,0,1-5.655,1.589,10.076,10.076,0,0,0,4.33-5.585,19.4,19.4,0,0,1-6.257,2.447A9.712,9.712,0,0,0,333.231,164a9.975,9.975,0,0,0-9.844,10.1,10.3,10.3,0,0,0,.254,2.3,27.725,27.725,0,0,1-20.3-10.554,10.282,10.282,0,0,0-1.333,5.082,10.164,10.164,0,0,0,4.381,8.4,9.669,9.669,0,0,1-4.463-1.26v.124a10.039,10.039,0,0,0,7.9,9.9,9.39,9.39,0,0,1-2.595.355,9.566,9.566,0,0,1-1.854-.179,9.885,9.885,0,0,0,9.2,7.009,19.445,19.445,0,0,1-12.23,4.325,19.708,19.708,0,0,1-2.35-.139A27.418,27.418,0,0,0,315.1,204c18.116,0,28.019-15.385,28.019-28.73,0-.439-.008-.878-.025-1.309A20.211,20.211,0,0,0,348,168.735" fill-rule="evenodd"/>
        </g>
    </svg>
    <!-- gear -->
    <svg v-else-if="name === 'gear'" class="fill-current text-gray-600" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
            <g id="icon-shape">
                <path d="M3.93830521,6.49683865 C3.63405147,7.02216933 3.39612833,7.5907092 3.23599205,8.19100199 L5.9747955e-16,9 L9.6487359e-16,11 L3.23599205,11.808998 C3.39612833,12.4092908 3.63405147,12.9778307 3.93830521,13.5031614 L2.22182541,16.363961 L3.63603897,17.7781746 L6.49683865,16.0616948 C7.02216933,16.3659485 7.5907092,16.6038717 8.19100199,16.7640079 L9,20 L11,20 L11.808998,16.7640079 C12.4092908,16.6038717 12.9778307,16.3659485 13.5031614,16.0616948 L16.363961,17.7781746 L17.7781746,16.363961 L16.0616948,13.5031614 C16.3659485,12.9778307 16.6038717,12.4092908 16.7640079,11.808998 L20,11 L20,9 L16.7640079,8.19100199 C16.6038717,7.5907092 16.3659485,7.02216933 16.0616948,6.49683865 L17.7781746,3.63603897 L16.363961,2.22182541 L13.5031614,3.93830521 C12.9778307,3.63405147 12.4092908,3.39612833 11.808998,3.23599205 L11,0 L9,0 L8.19100199,3.23599205 C7.5907092,3.39612833 7.02216933,3.63405147 6.49683865,3.93830521 L3.63603897,2.22182541 L2.22182541,3.63603897 L3.93830521,6.49683865 L3.93830521,6.49683865 Z M10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 L10,13 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </svg>
    <!-- home -->
    <svg v-else-if="name === 'home'" xmlns="http://www.w3.org/2000/svg" width="26.914" height="22.877" viewBox="0 0 26.914 22.877">
        <path id="パス_6" data-name="パス 6" d="M12.766,25.877V17.8h5.383v8.074h6.728V15.111h4.037L15.457,3,2,15.111H6.037V25.877Z" transform="translate(-2 -3)"/>
    </svg>
    <!-- home-outline -->
    <svg v-else-if="name === 'home-line'" xmlns="http://www.w3.org/2000/svg" width="29.52" height="24.049" viewBox="0 0 29.52 24.049">
        <path id="パス_6" data-name="パス 6" d="M12.766,25.877V17.8h5.383v8.074h6.728V15.111h4.037L15.457,3,2,15.111H6.037V25.877Z" transform="translate(-0.697 -2.327)" fill="none" stroke-width="1"/>
    </svg>
    <!-- user -->
    <svg v-else-if="name === 'user'" xmlns="http://www.w3.org/2000/svg" width="22.877" height="22.877" viewBox="0 0 22.877 22.877">
        <path id="パス_7" data-name="パス 7" d="M15.438,15.438A5.719,5.719,0,1,0,9.719,9.719,5.718,5.718,0,0,0,15.438,15.438Zm0,2.86C11.621,18.3,4,20.214,4,24.017v2.86H26.877v-2.86C26.877,20.214,19.256,18.3,15.438,18.3Z" transform="translate(-4 -4)"/>
    </svg>
    <!-- user-outline -->
    <svg v-else-if="name === 'user-line'" xmlns="http://www.w3.org/2000/svg" width="23.877" height="23.877" viewBox="0 0 23.877 23.877">
        <path id="パス_7" data-name="パス 7" d="M15.438,15.438A5.719,5.719,0,1,0,9.719,9.719,5.718,5.718,0,0,0,15.438,15.438Zm0,2.86C11.621,18.3,4,20.214,4,24.017v2.86H26.877v-2.86C26.877,20.214,19.256,18.3,15.438,18.3Z" transform="translate(-3.5 -3.5)" fill="none" stroke-width="1"/>
    </svg>
    <!-- map -->
    <svg v-else-if="name === 'map'" xmlns="http://www.w3.org/2000/svg" width="15.716" height="22.452" viewBox="0 0 15.716 22.452">
        <path id="map-marker" d="M12.858,12.665a2.807,2.807,0,1,1,2.807-2.807,2.807,2.807,0,0,1-2.807,2.807M12.858,2A7.858,7.858,0,0,0,5,9.858c0,5.894,7.858,14.594,7.858,14.594s7.858-8.7,7.858-14.594A7.858,7.858,0,0,0,12.858,2Z" transform="translate(-5 -2)"/>
    </svg>
    <!-- map-outline -->
    <svg v-else-if="name === 'map-line'" xmlns="http://www.w3.org/2000/svg" width="16.716" height="23.698" viewBox="0 0 16.716 23.698">
        <path id="map-marker" d="M12.858,12.665a2.807,2.807,0,1,1,2.807-2.807,2.807,2.807,0,0,1-2.807,2.807M12.858,2A7.858,7.858,0,0,0,5,9.858c0,5.894,7.858,14.594,7.858,14.594s7.858-8.7,7.858-14.594A7.858,7.858,0,0,0,12.858,2Z" transform="translate(-4.5 -1.5)" fill="none" stroke-width="1"/>
    </svg>
    <!-- cross -->
    <svg v-else-if="name === 'cross'" xmlns="http://www.w3.org/2000/svg" width="10.885" height="10.875" viewBox="0 0 10.885 10.875">
        <path id="XMLID_732_" d="M30.553,29.216a.933.933,0,0,1,0,1.337.959.959,0,0,1-1.337,0L25.393,26.73l-3.823,3.823a.959.959,0,0,1-1.337,0,.933.933,0,0,1,0-1.337l3.823-3.823-3.823-3.823a.946.946,0,0,1,1.337-1.337l3.823,3.823,3.823-3.823a.946.946,0,0,1,1.337,1.337L26.73,25.393Z" transform="translate(-19.95 -19.95)"/>
    </svg>
    <!-- moon -->
    <svg v-else-if="name === 'moon'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14.437" height="14.437" viewBox="0 0 14.437 14.437">
        <defs>
            <linearGradient id="linear-gradient-moon" x1="0.419" y1="-0.078" x2="0.831" y2="1.131" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#fffca8"/>
            <stop offset="1" stop-color="#ffc400"/>
            </linearGradient>
        </defs>
        <g id="グループ_19" data-name="グループ 19" transform="translate(-1016.563 -338.563)">
            <path id="前面オブジェクトで型抜き_1" data-name="前面オブジェクトで型抜き 1" d="M19.558-1353a7.393,7.393,0,0,1-4.313-1.376,7.476,7.476,0,0,1-1.6-1.549,7.418,7.418,0,0,1-1.08-1.969,7.015,7.015,0,0,0,3.417.887,6.968,6.968,0,0,0,2.73-.551,6.988,6.988,0,0,0,2.229-1.5,6.99,6.99,0,0,0,1.5-2.229,6.969,6.969,0,0,0,.551-2.73,7.018,7.018,0,0,0-.887-3.417,7.423,7.423,0,0,1,1.969,1.08,7.472,7.472,0,0,1,1.549,1.6A7.392,7.392,0,0,1,27-1360.442a7.4,7.4,0,0,1-.585,2.9,7.418,7.418,0,0,1-1.595,2.366,7.416,7.416,0,0,1-2.366,1.595A7.393,7.393,0,0,1,19.558-1353Z" transform="translate(1004 1706)" fill="url(#linear-gradient-moon)"/>
        </g>
    </svg>
    <!-- sun -->
    <svg v-else-if="name === 'sun'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 18 18">
        <defs>
            <linearGradient id="linear-gradient" x1="0.353" y1="-0.03" x2="0.684" y2="1.063" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#ffba00"/>
            <stop offset="1" stop-color="#ff4a4a"/>
            </linearGradient>
        </defs>
        <g id="グループ_18" data-name="グループ 18" transform="translate(-595 -334)">
            <g id="グループ_13" data-name="グループ 13" transform="translate(-62.087 -2.087)">
            <circle id="楕円形_15" data-name="楕円形 15" cx="5" cy="5" r="5" transform="translate(661.087 340.087)" fill="url(#linear-gradient)"/>
            </g>
            <g id="グループ_14" data-name="グループ 14">
            <path id="多角形_1" data-name="多角形 1" d="M1,0,2,3H0Z" transform="translate(603 334)" fill="#ffb205"/>
            <path id="多角形_2" data-name="多角形 2" d="M1,0,2,3H0Z" transform="translate(605 352) rotate(180)" fill="#ff5642"/>
            </g>
            <g id="グループ_15" data-name="グループ 15" transform="translate(419.445 -326.63) rotate(45)">
            <path id="多角形_1-2" data-name="多角形 1" d="M1,0,2,3H0Z" transform="translate(603 334)" fill="#ff9b14"/>
            <path id="多角形_2-2" data-name="多角形 2" d="M1,0,2,3H0Z" transform="translate(605 352) rotate(180)" fill="#ff6b34"/>
            </g>
            <g id="グループ_16" data-name="グループ 16" transform="translate(947 -261) rotate(90)">
            <path id="多角形_1-3" data-name="多角形 1" d="M1,0,2,3H0Z" transform="translate(603 334)" fill="#ff762c"/>
            <path id="多角形_2-3" data-name="多角形 2" d="M1,0,2,3H0Z" transform="translate(605 352) rotate(180)" fill="#ff911b"/>
            </g>
            <g id="グループ_17" data-name="グループ 17" transform="translate(1273.63 158.445) rotate(135)">
            <path id="多角形_1-4" data-name="多角形 1" d="M1,0,2,3H0Z" transform="translate(603 334)" fill="#ff5a3f"/>
            <path id="多角形_2-4" data-name="多角形 2" d="M1,0,2,3H0Z" transform="translate(605 352) rotate(180)" fill="#ffaf08"/>
            </g>
        </g>
    </svg>
    <!-- checked -->
    <svg v-else-if="name === 'checked'" xmlns="http://www.w3.org/2000/svg" width="14" height="10.16" viewBox="0 0 14 10.16">
        <path id="パス_8" data-name="パス 8" d="M9.84,17.08a1,1,0,0,1-.707-.293l-3.84-3.84a1,1,0,1,1,1.414-1.414L9.84,14.666l7.453-7.453a1,1,0,0,1,1.414,1.414l-8.16,8.16A1,1,0,0,1,9.84,17.08Z" transform="translate(-5 -6.92)" fill="#fff"/>
    </svg>

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ['name', 'color']
})
</script>
