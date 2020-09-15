<template>
	<div class="login-block">
		<transition name="scale-up-to-up">
			<fv-progress-bar
				v-show="login.lock"
				:loading="true"
				foreground="#FF8B00"
				style="position: absolute; left: 0px; top: 0px; width: 100%;"
			></fv-progress-bar>
		</transition>
		<div class="main-block">
			<span class="border-top"></span>
			<div class="s1">
				<span class="logo-block">
					<img src="@/assets/logo.png" alt />
					<p class="l-title">Creators Cloud</p>
				</span>
				<p class="identity-field">
					<transition name="swipe-right">
						<fv-text-box
							v-show="!login.verify"
							v-model="user.email"
							placeholder="Email"
							borderWidth="2"
							:revealBorder="true"
							border-color="transparent"
							focusBorderColor="transparent"
							background="whitesmoke"
							borderRadius="3"
							style="display:inline-block; width: 90%; height: 50px;"
							@keydown.tab="stepFocus"
							@keyup="handleEnter"
						></fv-text-box>
					</transition>
					<fv-button
						borderRadius="3"
						style="display:inline-block;width:10%;height: 54px;top:-2px"
						@click="login.verify ^= true"
					>
						<i
							class="ms-Icon"
							:class="[
                login.verify ? 'ms-Icon--ChevronRight' : 'ms-Icon--ChevronLeft'
              ]"
						></i>
					</fv-button>
					<transition name="swipe-left">
						<fv-text-box
							v-show="login.verify"
							v-model="user.verify"
							placeholder="请输入8位数的验证码"
							borderWidth="2"
							maxlength="8"
							:revealBorder="true"
							border-color="transparent"
							focusBorderColor="transparent"
							background="whitesmoke"
							borderRadius="3"
							style="display:inline-block; width: 90%; height: 50px;"
							@keyup="handleEnter"
						></fv-text-box>
					</transition>
				</p>
				<fv-text-box
					v-model="user.password"
					placeholder="密码"
					type="password"
					borderWidth="2"
					:revealBorder="true"
					border-color="transparent"
					focusBorderColor="transparent"
					background="whitesmoke"
					borderRadius="5"
					ref="pwd"
					style="width: 90%; height: 50px; margin-top: 15px;"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-button
					background="#00b46f"
					theme="dark"
					borderRadius="3"
					fontSize="16"
					fontWeight="600"
					style="width: 90%; height: 50px; margin-top: 20px;"
					:disabled="login.lock"
					@click="handleLogin"
				>继续</fv-button>
				<div class="s2">
					<p class="to-apply">忘记密码</p>
					<p class="to-apply" style="margin: 0px 8px;">·</p>
					<p class="to-apply" @click="$Go('/login/apply')">还没有账户?</p>
				</div>
			</div>
		</div>
		<div class="s3">
			<p>Terms and Conditions · Privacy Policy</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-block {
	@include FullRelative;
	@include HcenterVcenterC;

	flex: 1;

	.main-block {
		@include HcenterVcenterC;

		position: relative;
		width: 450px;
		height: 450px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05),
			0 5px 30px 0 rgba(166, 173, 201, 0.22);
		overflow: hidden;

		.border-top {
			position: relative;
			width: 100%;
			height: 6px;
			background: linear-gradient(
				45deg,
				#dfe1e6,
				#495d80,
				#9f3a8c,
				#b90057,
				#a83279,
				#005f4b,
				#00b46f
			);
			background-size: 400% 400%;
			animation: login-cc-banner 15s ease infinite;
		}

		.s1 {
			@include FullRelative;
			@include HcenterC;

			flex: 1;
			padding: 25px;

			.logo-block {
				@include HcenterVcenterC;

				font-weight: 400;

				img {
					width: auto;
					height: 50px;
				}

				.l-title {
					@include color-cc;

					margin-top: 18px;
					background-image: linear-gradient(
						45deg,
						#dfe1e6,
						#495d80,
						#9f3a8c,
						#b90057,
						#a83279,
						#005f4b,
						#00b46f
					);
					font-family: Century;
					background-size: 400% 400%;
					user-select: none;
					animation: login-cc-banner 15s ease infinite;
				}
			}

			.identity-field {
				width: 90%;
				height: 60px;
				margin-top: 45px;
				display: flex;
			}

			.s2 {
				@include HcenterVcenter;

				margin-top: 25px;

				.to-apply {
					@include a-link;
				}
			}
		}
	}

	.s3 {
		@include a-link;

		margin-top: 35px;
		font-size: 12px;
	}
}

.swipe-left-enter-active {
	animation: swipe-left 0.5s linear;
}

.swipe-left-leave-active {
	animation: swipe-left 0.5s linear reverse;
}

.swipe-right-enter-active {
	animation: swipe-left 0.5s linear;
}

.swipe-right-leave-active {
	animation: swipe-left 0.5s linear reverse;
}

@keyframes swipe-left {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}

@keyframes login-cc-banner {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>

<script>
import { mapState } from "vuex";
import { userLogin } from "../../api/login";
import {setToken,setUserUid} from '../../utils/auth'
export default {
	name: "CCLogin",
	data() {
		return {
			user: {
				email: "",
				password: "",
				verify: "",
			},
			login: {
				lock: false,
				verify: false,
			},
		};
    },
    watch: {
		netWorkStatus(val) {
			if (!val) {
				this.login.lock = false;
				this.$barWarning("服务器响应失败", {
					status: "error",
				});
			}
		},
	},
    computed: {
		...mapState({
			netWorkStatus: (state) => state.netWorkStatus,
		}),
	},
	methods: {
		/**
		 * 登录
		 */
		submitLogin(){
		   this.login.lock=true
		   var param={};
		   param.nickName=this.user.email;
		   param.password=this.user.password;
           userLogin(param).then(res=>{
			   if(res.code=="success"){
					this.$barWarning("登录成功", {
						status: "correct",
					});
					var token=res.data.token
					var userUid=res.data.userUid
					setUserUid(userUid)
					setToken(token)
					let return_url = this.$route.query.return_url
						? this.$route.query.return_url
						: "/manage";
					this.$Go(`${return_url}`);					
			   }else{
					this.$barWarning(res.data, {
						status: "warning",
					});
					this.login.lock = false;                    
			   }
		   })
		},
		async handleLogin() {
			this.login.lock = true;
			this.$api.Auth.Login(this.user.email, null, this.user.password)
				.then((data) => {
					if (data.code == 100000) {
						setToken(data.data.token)
						setUserUid(data.data.user.uid)
                        this.$store.commit("clearInfo");
                        let dataInfo = data.data.user;
                        dataInfo.userid = data.data.user.uid;
                        this.$store.commit("setInfo", dataInfo);
						this.$barWarning("登录成功", {
							status: "correct",
						});
						let return_url = this.$route.query.return_url
							? this.$route.query.return_url
							: "/manage";
						this.$Go(`${return_url}`);
						this.login.lock = false;
					}
				})
				.catch((err) => {
                    if(err.message)
                        this.$barWarning(err.message, {
                            status: "warning",
                        });
                    else
                        this.$barWarning('请求错误', {
                            status: "warning",
                        });
					if (err.code == 10012) {
						this.$api.User.GetLoginCode(this.user.identity).then(
							(data) => {
								if (data.status == 20000) {
									this.login.verify = true;
									this.$barWarning("已发送验证码至邮箱");
								}
							}
						);
					}
					this.login.lock = false;
				});
		},
		stepFocus(event) {
			event.preventDefault();
			this.$refs.pwd.$el.querySelector("input").focus();
		},
		handleEnter(event) {
			if (this.login.lock) return false;
			if (event.keyCode == 13) this.submitLogin();
		},
	},
};
</script>