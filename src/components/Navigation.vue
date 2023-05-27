<template>
    <div>
        <nav>
            <ul>
                <li v-for="(link, index) in links" :key="index" @click="navigate(index)">
                    {{ link }}
                </li>
                <li class="slider" :style="sliderStyle"></li>
            </ul>
        </nav>
        <div>
            <slot :name="currentPage"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: ['Home', 'About', 'Contact'],
            currentPage: 'Home',
            sliderStyle: {}
        }
    },
    methods: {
        navigate(index) {
            this.currentPage = this.links[index];
            this.updateSliderStyle(index);
        },
        updateSliderStyle(index) {
            const slider = document.querySelector('.slider');
            const activeLink = document.querySelectorAll('nav li')[index];
            const activeLinkCoords = activeLink.getBoundingClientRect();
            const coords = {
                width: activeLinkCoords.width,
                left: activeLinkCoords.left
            };
            this.sliderStyle = {
                width: `${coords.width}px`,
                left: `${coords.left - 230}px`
            };
        }
    },
    mounted() {
        this.updateSliderStyle(0);
    }
}
</script>

<style>
nav {
    display: flex;
    position: relative;
    left: 110px;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    height: 50px;
    margin-bottom: 20px;
    border: 1px solid;
}

nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav li {
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    left: 1200px;
}

nav li:hover {
    color: #1E90FF;
}

.slider {
    height: 2px;
    background-color: #1E90FF;
    position: absolute;
    bottom: 10px;
    transition: all 0.3s ease-in-out;
}
</style>
