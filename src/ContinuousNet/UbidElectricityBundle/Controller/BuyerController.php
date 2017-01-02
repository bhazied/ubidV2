<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Buyer;
use ContinuousNet\UbidElectricityBundle\Form\BuyerType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Buyer Controller
 * 
 * Manage Buyers 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		BuyerController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/buyer")
 */
class BuyerController extends BaseController
{
	/**
	 * Lists all Buyer entities.
	 *
	 * @Route("/", name="buyer_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$buyers = $em->getRepository('UbidElectricityBundle:Buyer')->findAll();

		return $this->render('UbidElectricityBundle:Buyer:index.html.twig', array(
			'buyers' => $buyers,
		));
	}

	/**
	 * Creates a new Buyer entity.
	 *
	 * @Route("/new", name="buyer_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$buyer = new Buyer();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BuyerType', $buyer);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($buyer);
			$em->flush();

			return $this->redirectToRoute('buyer_show', array('id' => $buyer->getId()));
		}

		return $this->render('UbidElectricityBundle:Buyer:new.html.twig', array(
			'buyer' => $buyer,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Buyer entity.
	 *
	 * @Route("/{id}", name="buyer_show")
	 * @Method("GET")
	 */
	public function showAction(Buyer $buyer)
	{
		$deleteForm = $this->createDeleteForm($buyer);

		return $this->render('UbidElectricityBundle:Buyer:show.html.twig', array(
			'buyer' => $buyer,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Buyer entity.
	 *
	 * @Route("/{id}/edit", name="buyer_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Buyer $buyer)
	{
		$deleteForm = $this->createDeleteForm($buyer);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BuyerType', $buyer);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($buyer);
			$em->flush();

			return $this->redirectToRoute('buyer_edit', array('id' => $buyer->getId()));
		}

		return $this->render('UbidElectricityBundle:Buyer:edit.html.twig', array(
			'buyer' => $buyer,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Buyer entity.
	 *
	 * @Route("/{id}", name="buyer_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Buyer $buyer)
	{
		$form = $this->createDeleteForm($buyer);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($buyer);
			$em->flush();
		}

		return $this->redirectToRoute('buyer_index');
	}

	/**
	 * Creates a form to delete a Buyer entity.
	 *
	 * @param Buyer $buyer The Buyer entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Buyer $buyer)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('buyer_delete', array('id' => $buyer->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
