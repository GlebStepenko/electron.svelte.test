<script lang="ts">
	import {onMount} from 'svelte';
	import SaveText from '../save.text/save.text.svelte';
	import dataController from '../../controller/data.controller';
	import { v4 as uuidv4 } from 'uuid';

	let pageRawUrl;// = 'https://tedbauer.medium.com/university-of-idaho-murders-now-it-looks-like-john-jack-showalter-right-efbe57a2cd17';
	let pageTitle = '';

	let iframe;

	let saveButtonVisible = false;
	let saveButtonTop = 0;
	let saveButtonLeft = 0;
	let selectedText: string;
	let pageUrl: string;

	const goUrl = () => {
		//add http before entered url
		pageUrl  = !pageRawUrl.startsWith('https://') ? `https://${pageRawUrl}` : pageRawUrl;
	}

	const onKeyPress = e => {
		if (e.charCode === 13) {
			goUrl();
		}
	};

	const onCloseClick= () =>  {
		saveButtonVisible = false;
	}

	const onSaveClick = () => {
		//create object to save and save to controller
		const { hostname } = new URL(pageUrl);
		dataController.addMemento({
			id: uuidv4(),
			title: pageTitle,
			text: selectedText,
			url: pageUrl,
			domain: hostname
		});
		saveButtonVisible = false;
		deselectPage();
	}

	const deselectPage = () => {
		//remove all selection in frame
		const innerDocument = (iframe.contentDocument)
			? iframe.contentDocument
			: iframe.contentWindow.document;

		const selection = innerDocument.getSelection();
		selection.removeAllRanges();
	}


		onMount(async () => {
			//after load component, set load page hook,
			iframe = document.getElementById('iframe');
			iframe.addEventListener('load', _ => {
				const innerDocument = (iframe.contentDocument)
								? iframe.contentDocument
								: iframe.contentWindow.document;

				//after load page  set mouseup hook and if page has selected content show popup with save button
				innerDocument.addEventListener('mouseup', event=> {
					selectedText = innerDocument.getSelection().toString();
					if (selectedText.length > 0) {
						pageTitle = innerDocument.title
						saveButtonVisible = true;
						saveButtonTop = event.clientY - 50;
						saveButtonLeft = Math.max(event.clientX - 150, 0) ; //correct position next left half page
					} else {
						saveButtonVisible = false;
					}
				});
			});
		});
</script>



<div class="container-main">
	<div class="container-input">
		<input type="text" class="input-url" placeholder="Enter url to start, for example medium.com" bind:value={pageRawUrl} on:keypress={onKeyPress}/>
		<button class="button save-button" on:click={() => goUrl()}>Go</button>
	</div>

	<div class="container-preview">
		<iframe
			seamless
			title="cccc"
			sandbox="allow-same-origin"
			id="iframe"
			src="{pageUrl}"
		></iframe>
		<!--			sandbox="allow-same-origin" didn't have time to find out and i don't know what is it,  but without this line i have error (in electron) :ERROR:crashpad_client_win.cc(844)] not connected-->

		{#if saveButtonVisible}
			<div class="container-button-save" style="top: {saveButtonTop}px; left: {saveButtonLeft}px;" >
				<SaveText
					on:onCloseClick={onCloseClick}
					on:onSaveClick={onSaveClick}/>
			</div>
		{/if}

	</div>

</div>

<style lang="scss">
		input{
    flex: 1;
		}


	iframe{
		width: 100%;
		height: 100%;
  box-sizing: border-box;
  border: none;
	}

	.container-main{
		display: flex;
		flex-flow: column;
		height: 100%;
  padding: 1em;
  box-sizing: border-box;
	}

	.container-input{
		display: flex;
		flex-flow: row nowrap;
		//height: 80px;
	}

	.container-preview{
   flex: 100%;
			position: relative;
	}

	.container-button-save{
			position: absolute;
	}


  :root {

    --input-color: #99A3BA;
    --input-border: #CDD9ED;
    --input-background: #fff;
    --input-placeholder: #CBD1DC;

    --input-border-focus: #275EFE;

    --group-color: var(--input-color);
    --group-border: var(--input-border);
    --group-background: #EEF4FF;

    --group-color-focus: #fff;
    --group-border-focus: var(--input-border-focus);
    --group-background-focus: #678EFE;
  }

  .input-url {
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: var(--input-color);
    border: 1px solid var(--input-border);
    background: var(--input-background);
    transition: border .3s ease;
    &::placeholder {
      color: var(--input-placeholder);
    }
    &:focus {
      outline: none;
      border-color: var(--input-border-focus);
    }
  }

</style>
