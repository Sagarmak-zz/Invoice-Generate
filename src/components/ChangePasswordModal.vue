<template lang="html">
	<div class="change-password">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Change Password</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

					<div class="not-loading" v-if="!loading">
						<div class="field">
							<label class="label">Email</label>
							<div class="control">
								<input disabled v-model="user_email" name="email"
                class="input" type="email" placeholder="Email">
							</div>
							<div v-show="errors.has('email')" class="help is-danger">
								The Email is required.
							</div>
						</div>

						<div class="field">
							<label class="label">Password</label>
							<div class="control">
								<input v-validate="'required'" v-model="password" name="password"
                class="input" type="password" placeholder="********">
							</div>
							<div v-show="errors.has('password')" class="help is-danger">
								The Password is required.
							</div>
						</div>

						<div class="field">
							<label class="label">Confirm Password</label>
							<div class="control">
								<input v-model="confirm" @keyup.enter="validateAndUpdateAdminPassword"
                 v-validate="'required|confirmed:password'" name="confirm" class="input" type="password" placeholder="********">
							</div>
							<div v-show="errors.has('confirm')" class="help is-danger">
								The Confirm Password should match the Password field.
							</div>
						</div>

					</div>

					<div class="loading" v-show="loading">
		        <span class="title is-4">Please wait while we load the data...</span>
		        <div class="fa fa-spinner fa-spin"> </div>
		      </div>

				</section>
				<footer class="modal-card-foot">
					<a @click="validateAndUpdateAdminPassword" class="button is-success">Update</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>

	</div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'change-password',
  created() {
    this.callUser();
  },
  data() {
    return {
      email: '',
      password: '',
      confirm: '',
      user_email: '',
      loading: false,
      loadingLight: false
    }
  },
  methods: {
    validateAndUpdateAdminPassword() {
      this.$validator.validateAll().then( ( result ) => {
        if ( result ) {
          //correct
          // eslint-disable-next-line
          this.updatePassword();
        } else {
          //not correct
          let toast = this.$toasted.error( 'Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        }
      } );
    },

    updatePassword() {
      this.loadingLight = true;
      api.updateAdminPassword( this.password )
        .then( response => {
          this.loadingLight = false;
          if ( response.data = "Password successfully updated" ) {
            let toast = this.$toasted.success( 'Password updated successfully!', {
              theme: "outline",
              position: "top-center",
              duration: 3000
            } );
            this.$bus.$emit( 'password-changed' );
          }
        } )
        .catch( error => {
          this.loadingLight = false;
          console.log( error );
        } )
    },

    callUser() {
      this.loading = true;
      api.userDetails()
        .then( ( response ) => {
          this.loading = false;
          this.user_email = response.data.user_email;
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
  },
  components: {
    LoadingLight
  }
}
</script>

<style lang="scss" scoped>
.change-password {
    .field {
        .label {
            width: 0;
        }
    }
}
</style>
