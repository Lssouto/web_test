app.controller("negMercadoriaCtrl", function($scope,$http){
			// produtos sao os produtos a serem mostrado na table
			$scope.produtos = [];
			$scope.error={value: "", hide: true};

			// Seta error para seu valor original
			var resetError = function(){
				$scope.error.value="";
				$scope.error.hide = true;
			}
			// Recebe uma mensagem a ser mostrada na div de error
			var setError = function(msg){
				$scope.error.value = msg;
				$scope.error.hide = false;
			}
			
			// Acessa o back e carrega os dados dos produtos, caso não acesse, mostra uma mensagem
			var loadMercadoria = function(){
					$http.get("/api/produtos").then(function(valor,status){
						$scope.produtos = valor.data;
					},function(value,status){
						console.log("Não foi possivel carregar os dados");
					});

				};

			/**
			 * [Description addMercadoria]
			 * @param {objeto} produto [Contem os dados preenhidos do addForm]
			 * Valida produto, 
			 * 	Caso esteja algo errado 
			 * 		Chama a função setError e encerra
			 * 	Caso esteja correto 
			 * 		Reseta a div de error
			 *  		Contata a base para pegar o ultimo codigo inserido e setar o proximo no Objeto produto
			 *  		Contata o back enviando o objeto produto
			 *  			Se der sucess 
			 *  				Ele recarrega as mercadorias
			 *  				Reinicia o valor de produto
			 */
			$scope.addMercadoria = function (produto)
				{		

					if(!produto.tpNeg || !produto.preco || !produto.qtd || !produto.nome || !produto.tipo) {
						setError("Por favor, Verifique os dados novamente");
					}
					else{
						resetError();
						$http.get("/api/produtos").then(function(valor,status){
							produto.codigo = (valor.data[(valor.data.length-1)].codigo) + 1 ;
							console.log(produto);

							$http.post("/api/produtos",produto).then(function(valor){
						
								loadMercadoria();
								delete $scope.produto;
								$scope.addForm.$setPristine();
							});
						});
					}

				}
			/**
			 * [criterioOrd description]
			 * @param  {string} campo [uma coluna da tabela]
			 * Seta um valor para a ordenação da tabela ou inverte o sentido dela
			 */
			$scope.criterioOrd = function(campo)
				{
					$scope.campoOrd = campo;
					$scope.campoDir = !$scope.campoDir;
				};
			/**
			 * [formClear description]
			 *Limpa o form
			 *E set como novo
			 */
			$scope.formClear = function(){
				delete $scope.produto;
				$scope.addForm.$setPristine();
			}

			loadMercadoria();
});