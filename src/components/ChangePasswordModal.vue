<template lang="html">
	<div class="change-password">
		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Change Password</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					<label class="label">Password</label>
            <p class="control">
              <input class="input" type="text" placeholder="Text input">
            </p>
            <label class="label">Confirm Password</label>
            <p class="control has-icon has-icon-right">
              <input class="input" type="text" placeholder="Text input" value="bulma">
            </p>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Save changes</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->
	</div>
</template>

<script>
export default {
	name: 'change-password',
	data() {
		return {
			password: '',
			confirm: ''
		}
	},
	methods: {

	}
}
</script>

<style lang="scss">
.change-password {

}
</style>
