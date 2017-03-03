<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Licence;
use ContinuousNet\BiodyXpertBundle\Form\LicenceType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Licence Controller
 * 
 * Manage Licences 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		LicenceController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/licence")
 */
class LicenceController extends BaseController
{
	/**
	 * Lists all Licence entities.
	 *
	 * @Route("/", name="licence_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$licences = $em->getRepository('BiodyXpertBundle:Licence')->findAll();

		return $this->render('BiodyXpertBundle:Licence:index.html.twig', array(
			'licences' => $licences,
		));
	}

	/**
	 * Creates a new Licence entity.
	 *
	 * @Route("/new", name="licence_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$licence = new Licence();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\LicenceType', $licence);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($licence);
			$em->flush();

			return $this->redirectToRoute('licence_show', array('id' => $licence->getId()));
		}

		return $this->render('BiodyXpertBundle:Licence:new.html.twig', array(
			'licence' => $licence,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Licence entity.
	 *
	 * @Route("/{id}", name="licence_show")
	 * @Method("GET")
	 */
	public function showAction(Licence $licence)
	{
		$deleteForm = $this->createDeleteForm($licence);

		return $this->render('BiodyXpertBundle:Licence:show.html.twig', array(
			'licence' => $licence,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Licence entity.
	 *
	 * @Route("/{id}/edit", name="licence_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Licence $licence)
	{
		$deleteForm = $this->createDeleteForm($licence);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\LicenceType', $licence);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($licence);
			$em->flush();

			return $this->redirectToRoute('licence_edit', array('id' => $licence->getId()));
		}

		return $this->render('BiodyXpertBundle:Licence:edit.html.twig', array(
			'licence' => $licence,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Licence entity.
	 *
	 * @Route("/{id}", name="licence_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Licence $licence)
	{
		$form = $this->createDeleteForm($licence);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($licence);
			$em->flush();
		}

		return $this->redirectToRoute('licence_index');
	}

	/**
	 * Creates a form to delete a Licence entity.
	 *
	 * @param Licence $licence The Licence entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Licence $licence)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('licence_delete', array('id' => $licence->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
