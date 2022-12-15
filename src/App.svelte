<script lang="ts">
	import SitePanel from './components/site.panel/site.panel.svelte';
	import MainList from './components/main.list/main.list.svelte';
</script>

<main class="container">
	<div class="container-list">
		<MainList />
	</div>

	<div class="container-site-preview">
		<SitePanel class="site-panel"/>
	</div>
</main>

<style lang="scss">

	.container {
		display: flex;
		flex-flow: row nowrap;
		text-align: center;
		margin: 0 auto;
		width: 100vw;
		height: 100vh;
	}

	.container-list{
		width: 50%;
	}
  .container-site-preview{
    height: 100%;
    width: 50%;
    overflow: hidden;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
