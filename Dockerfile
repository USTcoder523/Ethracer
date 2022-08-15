FROM ethereum/client-go:alltools-v1.8.11 as geth
FROM ethereum/solc:0.4.24 as solc

FROM ubuntu:16.04

MAINTAINER Aashish Kolluri (aashishkolluri6@gmail.com)

SHELL ["/bin/bash", "-c", "-l"]

# Install golang
# RUN apt-get install -y build-essential golang
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y software-properties-common python-software-properties

RUN apt-get install -y build-essential checkinstall
RUN apt-get install -y libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev wget
RUN wget https://www.python.org/ftp/python/3.6.14/Python-3.6.14.tar.xz
RUN tar xvf Python-3.6.14.tar.xz
RUN cd Python-3.6.14 && ./configure && make altinstall

RUN apt-get install -y wget unzip python-virtualenv git build-essential software-properties-common curl
RUN curl -O https://storage.googleapis.com/golang/go1.8.5.linux-amd64.tar.gz && tar -C /usr/local -xzf go1.8.5.linux-amd64.tar.gz && mkdir -p ~/go; \
    echo "export GOPATH=$HOME/go" >> ~/.bashrc && echo "export PATH=$PATH:$HOME/go/bin:/usr/local/go/bin" >> ~/.bashrc && source ~/.bashrc

# Install geth and solc
COPY --from=geth /usr/local/bin/evm /usr/local/bin/evm
COPY --from=solc /usr/bin/solc /usr/bin/solc

RUN mkdir dependencies 
# RUN cd dependencies && wget https://github.com/Z3Prover/z3/archive/master.zip &&  unzip master.zip && cd z3-master &&  python3.6 scripts/mk_make.py --prefix=/ --python --pypkgdir=/dependencies && \
# cd build &&  make &&  make install

ENV PYTHONPATH "${PYTONPATH}:/dependencies"

RUN apt-get update && apt-get install -y python-pip python3-pip musl-dev pandoc && pip3 install --upgrade setuptools
RUN python3.6 -m pip install requests web3 pysha3 z3-solver

RUN apt-get install -y vim

RUN mkdir /ethracer
COPY . /ethracer/
RUN mkdir /ethracer/HB/reports

WORKDIR /ethracer/HB

ENV ETHEREUM_ENDPOINT="http://host.docker.internal:8666"
ENTRYPOINT ["python3.6", "main.py"]

EXPOSE 80


#RUN cd /ethracer/HB && python3.6 main.py --checkone /mnt/c/contracts_solidity/0x325476448021c96c4bf54af304ed502bb7ad0675.sol 0x325476448021c96c4bf54af304ed502bb7ad0675 --blockchain --owner 0x056682f1cf0dc48266c1e47057297a64b58bb6fa
# have to configure IP tables with ---> iptables -A INPUT -i docker0 -j ACCEPT; and then start docker with ---> sudo docker run --net='host' -it ethracer; 
#sudo docker build -t ethracer  && sudo docker run --net='host' -it ethracer bash