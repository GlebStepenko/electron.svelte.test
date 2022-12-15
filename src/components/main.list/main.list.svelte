<script>
	import mementoes from '../../store';
</script>

<div class="container-main">
	<h1>Your highlights: </h1>

	<div class="container-note-list">
		{#each $mementoes as memento}
			<div class="note-item">
				<div class="container-title">
					<span class="label-title">{memento.title}</span>
					<a target="_blank" href="{memento.url}" rel="noreferrer" title="{memento.url}">
						{memento.domain}
					</a>
				</div>
				<span class="label-text" title="{memento.text}">{memento.text}</span>
			</div>
		{/each}
	</div>

</div>

<style lang="scss">
		.container-main{
				color: #CBD1DC;
		}

		.container-title{
				display: flex;
				flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 0.5em;
		}

		.label-title{
    white-space: nowrap;
    overflow: hidden;
    max-width: 400px;
    text-overflow: ellipsis;
    display: block;
    font-weight: bold;
		}

		h1 {
				width: 100%;
		}

		.container-note-list{
				display: flex;
				flex-flow: column;
				gap: 1em;
    padding: 0.5em;
		}

		.note-item{
    display: flex;
    flex-flow: column;
    padding: 1em;
				border: 2px solid rgba(0, 0, 0, 0.42);
				border-radius: 6px;
		}

		.label-text{
				align-self: flex-start;
				text-align: left;
	   overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
		}
</style>

