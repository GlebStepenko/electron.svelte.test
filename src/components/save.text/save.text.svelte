<script>
	import Logo from "../../assets/icons/close.svg";
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('onCloseClick');
	}
	const save = () => {
		dispatch('onSaveClick');
	}
</script>

<div class="container-main">
	<button class="button-close"  on:click={() => close()}>
		<Logo width=20 />
	</button>
	<button class="button-save" on:click={() => save()} >Save content</button>
</div>

<style lang="scss">

		.button-close{
				position: absolute;
				top: 0;
				right: 0;
				cursor: pointer;
    background: transparent;
    border: none;
		}

  .container-main{
				position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    backdrop-filter: blur(10px);
    border: 2px solid #454545;
    border-radius: 6px;
		}

  .button-save{
				margin: 0;
		}
</style>
